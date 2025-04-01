"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function ProfileImageUpload() {
  const { data: session, update } = useSession()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleUpload = async () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    
    try {
      // In a real app, you would upload to a server or cloud storage
      // For demo purposes, we'll simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate a successful response with the image URL
      const imageUrl = previewUrl
      
      // Update session with new image URL
      await update({ image: imageUrl })
      
      toast({
        title: "Profile image updated",
        description: "Your profile image has been successfully updated.",
      })
    } catch (_) {
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage 
            src={previewUrl || session?.user.image || ""} 
            alt={session?.user.name || ""} 
          />
          <AvatarFallback>{session?.user.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Profile Picture</h3>
          <p className="text-sm text-muted-foreground">
            Upload a new profile picture. JPG, PNG or GIF.
          </p>
        </div>
      </div>
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input 
          id="picture" 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      
      {previewUrl && (
        <Button 
          onClick={handleUpload} 
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Picture"}
        </Button>
      )}
    </div>
  )
}
