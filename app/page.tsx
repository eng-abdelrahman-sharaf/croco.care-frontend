export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">Welcome</h1>
          <p className="text-muted-foreground">
            This is the main content area. The floating sidebar will expand when you hover over it.
          </p>
        </div>
      </main>
    </div>
  )
}
