'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { ToastAction } from "@/components/ui/toast"
import Link from "next/link"


const formSchema = z.object({
  castUrl: z.string().url(),
  address: z.string()
})

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Minting cast on Base...
    </Button>
  )
}

export default function CastForm() {

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      const json = await res.json()
      console.log(json)

      if (res.status === 400) {
        toast({
          variant: "destructive",
          title: "Ooops!",
          description: `${json.message}`,
        })
        return
      }
      toast({
        title: "Success!",
        description: "Cast Minted",
        action: (
          <Link href={`https://opensea.io/assets/base/${json.mintCastStatus.contractAddress}/${json.mintCastStatus.tokenId}`}>
            <ToastAction altText="View NFT">View NFT</ToastAction>
          </Link>
        )
      })
      setIsLoading(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ooops!",
        description: "Something went wrong :/",
      })
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full gap-4 w-80 lg:w-96">
        <FormField
          control={form.control}
          name="castUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Cast URL</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="https://warpcast.com/dwr.eth/0x42979bb9" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="dwr.eth" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        { isLoading ? ButtonLoading() : 
        <Button type="submit">Mint Cast</Button>
        }
        <Toaster />
      </form>
    </Form>
  )
}

