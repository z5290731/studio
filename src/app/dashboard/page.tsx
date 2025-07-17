"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MongoQuillLogo } from "@/components/icons";
import { Database, Play, Loader2, Code2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DB_CONTENT, DB_CONFIG } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type DbId = keyof typeof DB_CONTENT;

const DEFAULT_QUERY = `{
  "find": "passengers",
  "filter": { "tier": "Solitaire PPS Club" },
  "limit": 5
}
// Note: This is a simulated environment.
// Supported operations: find, filter, limit.
// Supported operators: $gt, $lt, $gte, $lte, $ne, $in, $nin, $and, $or, $not
// Click "Run Query" to see results.`;

// A simple query executor
function executeQuery(data: Record<string, any[]>, query: any) {
  if (!query.find || typeof query.find !== 'string') {
    throw new Error('Missing or invalid "find" property for collection name.');
  }

  const collectionName = query.find;
  if (!data[collectionName]) {
    throw new Error(`Collection "${collectionName}" not found.`);
  }

  let results = [...data[collectionName]];

  if (query.filter && typeof query.filter === 'object') {
    results = results.filter(doc => evaluateFilter(doc, query.filter));
  }

  if (query.limit && typeof query.limit === 'number') {
    results = results.slice(0, query.limit);
  }

  return { collection: collectionName, data: results };
}

function evaluateFilter(doc: any, filter: any): boolean {
  const filterKeys = Object.keys(filter);

  if (filterKeys.includes('$and')) {
    if (!Array.isArray(filter.$and)) throw new Error('$and must be an array');
    return filter.$and.every((subFilter: any) => evaluateFilter(doc, subFilter));
  }

  if (filterKeys.includes('$or')) {
    if (!Array.isArray(filter.$or)) throw new Error('$or must be an array');
    return filter.$or.some((subFilter: any) => evaluateFilter(doc, subFilter));
  }
  
  if (filterKeys.includes('$not')) {
    if (typeof filter.$not !== 'object') throw new Error('$not must be an object');
    return !evaluateFilter(doc, filter.$not);
  }

  return filterKeys.every(key => {
    const docValue = getNestedValue(doc, key);
    const filterValue = filter[key];

    if (typeof filterValue === 'object' && filterValue !== null && !Array.isArray(filterValue)) {
      const op = Object.keys(filterValue)[0];
      const val = filterValue[op];

      switch(op) {
        case '$gt': return docValue > val;
        case '$lt': return docValue < val;
        case '$gte': return docValue >= val;
        case '$lte': return docValue <= val;
        case '$ne': return docValue !== val;
        case '$in': 
          if (!Array.isArray(val)) throw new Error(`$in requires an array value.`);
          return val.includes(docValue);
        case '$nin':
          if (!Array.isArray(val)) throw new Error(`$nin requires an array value.`);
          return !val.includes(docValue);
        default:
          return JSON.stringify(docValue) === JSON.stringify(filterValue);
      }
    }
    
    return docValue === filterValue;
  });
}

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}


export default function DashboardPage() {
  const [activeDb, setActiveDb] = useState<DbId | null>("singapore-airlines");
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const collections = useMemo(() => {
    if (!activeDb) return [];
    return Object.keys(DB_CONTENT[activeDb]);
  }, [activeDb]);

  const handleSelectDb = (dbId: DbId) => {
    setActiveDb(dbId);
    setResult(null);
    setQuery(DEFAULT_QUERY);
    setActiveCollection(null);
    setError(null);
  };

  const handleRunQuery = () => {
    if (!activeDb) return;
    setIsLoading(true);
    setResult(null);
    setError(null);
    setActiveCollection(null);

    setTimeout(() => {
      try {
        // Remove comments and parse the query string
        const cleanedQueryString = query.replace(/\/\/.*$/gm, '');
        const queryObj = JSON.parse(cleanedQueryString);
        
        const dbData = DB_CONTENT[activeDb];
        const { collection, data } = executeQuery(dbData, queryObj);

        setActiveCollection(collection);
        setResult(JSON.stringify(data, null, 2));
      } catch (e: any) {
        setError(e.message || "Invalid query format. Please use valid JSON.");
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex h-screen bg-background text-foreground font-sans">
      {/* Left Panel: Database Selection */}
      <aside className="w-[280px] flex-shrink-0 bg-muted/30 border-r flex flex-col">
        <div className="p-4 border-b h-16 flex items-center gap-3">
          <MongoQuillLogo className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-headline font-semibold">MongoQuill</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Databases</h2>
          {DB_CONFIG.map((db) => (
            <Button
              key={db.id}
              variant={activeDb === db.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-11 text-base",
                activeDb === db.id && "font-bold"
              )}
              onClick={() => handleSelectDb(db.id as DbId)}
            >
              <Database className="mr-3 h-5 w-5" />
              {db.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Right Panel: Editor and Results */}
      <main className="flex-1 flex flex-col h-screen">
        {!activeDb ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a database to begin.
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            {/* Top half: Query Editor */}
            <div className="flex-1 flex flex-col h-1/2 border-b">
              <header className="p-4 flex justify-between items-center border-b">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium">{DB_CONFIG.find(db => db.id === activeDb)?.name}</h2>
                  <span className="text-sm text-muted-foreground">/</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {collections.map(name => (
                      <span key={name} className="text-sm text-muted-foreground">{name}</span>
                    ))}
                  </div>
                </div>
                <Button onClick={handleRunQuery} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  Run Query
                </Button>
              </header>
              <div className="flex-1 relative">
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your MongoDB query here..."
                  className="absolute inset-0 w-full h-full resize-none rounded-none border-none focus-visible:ring-0 font-code text-sm p-4"
                />
              </div>
            </div>

            {/* Bottom half: Results */}
            <div className="flex-1 flex flex-col h-1/2">
              <header className="p-4 flex items-center gap-2 border-b">
                 <Code2 className="h-5 w-5" />
                 <h2 className="text-lg font-medium">Results</h2>
                 {activeCollection && <span className="text-sm text-muted-foreground">from &quot;{activeCollection}&quot; collection</span>}
              </header>
              <div className="flex-1 bg-muted/20 p-4 overflow-auto">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : error ? (
                   <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Query Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : result ? (
                  <pre className="font-code text-sm"><code >{result}</code></pre>
                ) : (
                  <div className="text-muted-foreground h-full flex items-center justify-center">
                    Run a query to see the results here.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
