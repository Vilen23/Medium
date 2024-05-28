import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
  
  export function AlertWrite() {
    const navigate = useNavigate();
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="rounded-full text-xs md:text-sm" variant="link">Write</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign In</AlertDialogTitle>
            <AlertDialogDescription>
              In order to write a blog, you need to sign in first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>{
                navigate("/signin")
            }}>Sign In</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  