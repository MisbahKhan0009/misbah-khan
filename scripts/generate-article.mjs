/**
 * Daily Article Generator
 * Calls Gemini API to generate a technical blog post related to:
 * PostgreSQL, Python, automation, LLMs, data processing, problem solving
 * 
 * Usage: node scripts/generate-article.mjs
 * Schedule with cron/Task Scheduler for daily generation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file manually (no external dependency needed)
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex > 0) {
        const key = trimmed.substring(0, eqIndex);
        const value = trimmed.substring(eqIndex + 1);
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found in .env or environment variables.');
  process.exit(1);
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`;

const ARTICLES_DIR = path.join(__dirname, '..', 'src', 'data', 'articles');

// Ensure articles directory exists
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

const TOPICS = [
  'Write about a practical PostgreSQL technique: explain one of these — window functions for running totals, recursive CTEs for hierarchical data, lateral joins for correlated subqueries, or partial indexes for query optimization. Include a real SQL example.',
  'Write about a Python automation pattern: explain one of these — building a robust web scraper with retry logic, automating Excel report generation with openpyxl, creating a CLI tool with argparse for data processing, or scheduling tasks with APScheduler. Include working code.',
  'Write about LangChain or LangGraph: explain one practical use case like building a document Q&A system, creating an agent that queries a database, implementing RAG with chunking strategies, or chaining multiple LLM calls with validation. Include code snippets.',
  'Write about a data processing technique: explain one of these — handling messy CSV data with Pandas, building an ETL pipeline with proper error handling, implementing data validation with Pydantic, or processing large files in chunks. Include Python code.',
  'Write about Selenium or Playwright automation: explain one of these — handling dynamic JavaScript pages, implementing proxy rotation for scraping, dealing with authentication flows, or building resilient selectors. Include practical code.',
  'Write about a SQL problem-solving approach: take a LeetCode-style SQL problem (like finding consecutive login days, ranking within groups, or gap-and-island detection) and walk through the thought process and solution.',
  'Write about Retool or internal tool building: explain one of these — connecting Retool to PostgreSQL with parameterized queries, building a CRUD interface for operations teams, implementing role-based views, or triggering automated workflows from Retool actions.',
  'Write about regex for data extraction: explain a practical scenario like extracting medical codes from text, parsing structured IDs from unstructured data, validating complex formats, or building a text processing pipeline with regex. Include patterns.',
  'Write about workflow automation: explain one of these — designing an n8n workflow for data sync, building error-handling into automation pipelines, implementing retry and dead-letter patterns, or monitoring automated systems.',
  'Write about problem-solving methodology: explain an approach to tackling ambiguous technical problems — how to decompose a complex data issue, reverse-engineer undocumented systems, or debug a failing data pipeline systematically.',
];

const PROMPT_TEMPLATE = `You are writing a technical blog post for a data analyst's portfolio website. The author specializes in PostgreSQL, Python, Selenium, Playwright, Retool, workflow automation, LLMs (LangChain/LangGraph), regex, and data processing.

IMPORTANT RULES:
- Write CONCRETE, FACTUAL technical content. No made-up libraries, fake APIs, or hypothetical tools.
- Include REAL code examples that would actually work.
- No emojis anywhere.
- Keep it concise: 600-900 words.
- Use a professional but approachable tone.
- The content should teach something practical that a reader can apply today.

TOPIC: {TOPIC}

Respond with ONLY a JSON object (no markdown code fences) in this exact format:
{
  "title": "A clear, specific title (max 80 chars)",
  "excerpt": "A 1-2 sentence summary of what the reader will learn (max 160 chars)",
  "category": "One of: SQL, Python, Automation, AI, Data Engineering, Problem Solving",
  "tags": ["tag1", "tag2", "tag3"],
  "readTime": 4,
  "content": "The full article in markdown format. Use ## for headings, use \`\`\`sql or \`\`\`python for code blocks. Structure with clear sections: Introduction, Main Content with code, Key Takeaway."
}`;

async function generateArticle() {
  // Pick a random topic
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const prompt = PROMPT_TEMPLATE.replace('{TOPIC}', topic);

  console.log('Generating article...');
  console.log('Topic hint:', topic.substring(0, 80) + '...');

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('No content returned from Gemini');
  }

  // Parse the JSON response (handle potential markdown fences and thinking)
  let cleanText = rawText.trim();
  
  // Remove markdown code fences
  if (cleanText.startsWith('```json')) {
    cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  
  // If Gemini included thinking/preamble, find the JSON object
  const jsonStart = cleanText.indexOf('{');
  const jsonEnd = cleanText.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('No JSON object found in response');
  }
  cleanText = cleanText.substring(jsonStart, jsonEnd + 1);

  // Try parsing directly first, fallback to fixing common issues
  let article;
  try {
    article = JSON.parse(cleanText);
  } catch (e) {
    // Gemini sometimes puts unescaped newlines in strings. Fix them.
    // Extract content field separately using regex
    const contentMatch = cleanText.match(/"content"\s*:\s*"([\s\S]*?)"\s*\}$/);
    if (contentMatch) {
      const beforeContent = cleanText.substring(0, contentMatch.index);
      let contentValue = contentMatch[1];
      // Escape unescaped newlines within the content string
      contentValue = contentValue.replace(/(?<!\\)\n/g, '\\n');
      contentValue = contentValue.replace(/(?<!\\)\r/g, '\\r');
      contentValue = contentValue.replace(/(?<!\\)\t/g, '\\t');
      const fixedJson = beforeContent + `"content": "${contentValue}"}`;
      try {
        article = JSON.parse(fixedJson);
      } catch (e2) {
        // Last resort: manually extract fields
        console.log('Attempting manual field extraction...');
        const titleMatch = cleanText.match(/"title"\s*:\s*"([^"]+)"/);
        const excerptMatch = cleanText.match(/"excerpt"\s*:\s*"([^"]+)"/);
        const categoryMatch = cleanText.match(/"category"\s*:\s*"([^"]+)"/);
        const tagsMatch = cleanText.match(/"tags"\s*:\s*\[([^\]]+)\]/);
        const readTimeMatch = cleanText.match(/"readTime"\s*:\s*(\d+)/);
        
        // For content, grab everything between "content": " and the last "} 
        const contentStart = cleanText.indexOf('"content"');
        let contentStr = '';
        if (contentStart !== -1) {
          const afterKey = cleanText.substring(contentStart);
          const valueStart = afterKey.indexOf('"', afterKey.indexOf(':') + 1) + 1;
          const fullAfter = afterKey.substring(valueStart);
          // Find the last unescaped quote
          let lastQuote = fullAfter.length - 1;
          while (lastQuote > 0 && (fullAfter[lastQuote] !== '"' || fullAfter[lastQuote - 1] === '\\')) {
            lastQuote--;
          }
          contentStr = fullAfter.substring(0, lastQuote);
        }

        article = {
          title: titleMatch?.[1] || 'Untitled Article',
          excerpt: excerptMatch?.[1] || '',
          category: categoryMatch?.[1] || 'Technical',
          tags: tagsMatch ? tagsMatch[1].replace(/"/g, '').split(',').map(t => t.trim()) : ['technical'],
          readTime: readTimeMatch ? parseInt(readTimeMatch[1]) : 4,
          content: contentStr.replace(/\\n/g, '\n').replace(/\\t/g, '\t'),
        };
      }
    } else {
      throw new Error(`Failed to parse Gemini response: ${e.message}`);
    }
  }

  // Generate slug and metadata
  const slug = article.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const today = new Date().toISOString().split('T')[0];

  const articleData = {
    id: `${today}-${slug}`,
    slug: slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    tags: article.tags,
    readTime: article.readTime || 4,
    content: article.content,
    createdAt: new Date().toISOString(),
    published: true,
  };

  // Save to articles directory
  const filename = `${today}-${slug}.json`;
  const filepath = path.join(ARTICLES_DIR, filename);

  fs.writeFileSync(filepath, JSON.stringify(articleData, null, 2), 'utf-8');
  console.log(`Article saved: ${filename}`);
  console.log(`Title: ${articleData.title}`);

  // Update the index file
  updateArticlesIndex();

  return articleData;
}

function updateArticlesIndex() {
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .sort()
    .reverse(); // newest first

  const articles = files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8'));
    // Return metadata only (no full content) for the index
    return {
      id: content.id,
      slug: content.slug,
      title: content.title,
      excerpt: content.excerpt,
      category: content.category,
      tags: content.tags,
      readTime: content.readTime,
      createdAt: content.createdAt,
      published: content.published,
    };
  });

  const indexPath = path.join(ARTICLES_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(articles, null, 2), 'utf-8');
  console.log(`Index updated: ${articles.length} articles`);
}

// Run with retry
async function run() {
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await generateArticle();
      return;
    } catch (err) {
      console.error(`Attempt ${attempt}/${maxRetries} failed: ${err.message}`);
      if (attempt < maxRetries) {
        console.log('Retrying in 2 seconds...');
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  }
  console.error('All retries exhausted.');
  process.exit(1);
}

run();
