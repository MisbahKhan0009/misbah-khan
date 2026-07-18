export const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh] w-full">
            <div className="relative w-12 h-12">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />

                {/* Spinning segment */}
                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />

                {/* Inner glow */}
                <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl animate-pulse" />
            </div>

            <p className="text-muted-foreground font-mono text-sm animate-pulse tracking-widest">
                LOADING SYSTEM
            </p>
        </div>
    );
};
