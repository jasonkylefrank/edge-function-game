"use server";
/*
  EDGE NETWORK NOTE:
  
  Functions become edge functions in Next.js (i.e., get deployed to Vercel's edge network) when used 
  in a context with `export const runtime = "edge"`.

  Server actions inherit the runtime from the page or layout they are used on (you can't set the
  runtime in server actions directly).

  So to make this server action become an "edge" function, we need to import it into a server component 
  and set the runtime of that component to 'edge'.  If a client component needs to call this server action,
  we can pass it from the edge-runtime server component to the client component via props.
  See example here: https://sdk.vercel.ai/docs/api-reference/streaming-react-response#client-side-setup
*/

export async function serverActionHandler(newTranslateVal: number) {
  console.log(
    "Hello from this Next.js Server Action. Value received: ",
    newTranslateVal
  );

  return newTranslateVal;
}
