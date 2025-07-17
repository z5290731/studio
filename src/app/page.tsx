"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MongoQuillLogo } from "@/components/icons";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ACCESS_CODE = "261100";

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "The access code you entered is incorrect.",
      });
      setCode("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <MongoQuillLogo className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">MongoQuill</CardTitle>
          <CardDescription>Enter your 6-digit access code to continue.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <Input
              type="text"
              placeholder="••••••"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="h-14 text-center text-2xl font-mono tracking-widest"
              disabled={isLoading}
              aria-label="Access Code"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? "Verifying..." : "Enter"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
