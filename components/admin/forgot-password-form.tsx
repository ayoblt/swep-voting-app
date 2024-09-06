import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ForgotPasswordForm = () => {
  return (
    <Card className="grid max-w-2xl w-full mx-auto rounded-lg py-10 px-0 sm:px-5 max-md:border-none max-md:shadow-none md:px-20 max-md:bg-transparent md:dark:bg-white">
      <CardHeader className="md:text-center">
        <CardTitle className="text-2xl md:dark:text-background">
          Forgot Password
        </CardTitle>
        <CardDescription>
          No worries, we&apos;ll send you reset instruction.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <form>
          <div className="mb-5 grid gap-4 ">
            <Label
              htmlFor="email"
              className="text-base md:dark:text-background"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              className="h-11 md:h-[3.125rem] px-5 placeholder:text-muted-foreground"
              placeholder="Enter your email"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="">
        <Button className="w-full h-12 text-white bg-secondary dark:bg-primary hover:bg-secondary/90 hover:dark:bg-primary/80">
          Reset Password
        </Button>
      </CardFooter>
      <CardFooter className="text-center">
        <Link
          href="/admin/login"
          className="text-center mt-4 inline-block mx-auto text-primary"
        >
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
