export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            articles: {
                Row: {
                    content: string | null
                    created_at: string | null
                    excerpt: string | null
                    id: string
                    published: boolean | null
                    read_time: number | null
                    slug: string
                    title: string
                    category: string | null
                    meta_description: string | null
                    tags: Json | null
                }
                Insert: {
                    content?: string | null
                    created_at?: string | null
                    excerpt?: string | null
                    id?: string
                    published?: boolean | null
                    read_time?: number | null
                    slug: string
                    title: string
                    category?: string | null
                    meta_description?: string | null
                    tags?: Json | null
                }
                Update: {
                    content?: string | null
                    created_at?: string | null
                    excerpt?: string | null
                    id?: string
                    published?: boolean | null
                    read_time?: number | null
                    slug?: string
                    title?: string
                    category?: string | null
                    meta_description?: string | null
                    tags?: Json | null
                }
            }
            projects: {
                Row: {
                    category: string | null
                    created_at: string | null
                    description: string | null
                    featured: boolean | null
                    id: string
                    slug: string
                    tags: string[] | null
                    title: string
                }
                Insert: {
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    featured?: boolean | null
                    id?: string
                    slug: string
                    tags?: string[] | null
                    title: string
                }
                Update: {
                    category?: string | null
                    created_at?: string | null
                    description?: string | null
                    featured?: boolean | null
                    id?: string
                    slug?: string
                    tags?: string[] | null
                    title?: string
                }
            }
            subscribers: {
                Row: {
                    confirmed: boolean | null
                    email: string
                    id: string
                    subscribed_at: string | null
                }
                Insert: {
                    confirmed?: boolean | null
                    email: string
                    id?: string
                    subscribed_at?: string | null
                }
                Update: {
                    confirmed?: boolean | null
                    email?: string
                    id?: string
                    subscribed_at?: string | null
                }
            }
            developer_webhooks: {
                Row: {
                    api_key: string
                    created_at: string | null
                    id: string
                    is_active: boolean | null
                    label: string
                    secret: string
                    url: string
                }
                Insert: {
                    api_key: string
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    label: string
                    secret: string
                    url: string
                }
                Update: {
                    api_key?: string
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    label?: string
                    secret?: string
                    url?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
