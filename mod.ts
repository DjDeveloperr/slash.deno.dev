export interface FetchEvent extends Event {
  respondWith: CallableFunction;
  request: Request;
}

addEventListener("fetch", ((evt: FetchEvent) => {
  const path = evt.request.url;

  if (path == "/") {
    evt.respondWith(
      new Response(
        "Import Harmony Deploy Slash Commands\n- `/main` - from main branch\n- `/<version>` - versioned import"
      )
    );
  } else {
    const version = path.slice(1);
    evt.respondWith(
      new Response(null, {
        status: 302,
        headers: {
          Location:
            version === "main" || version == "beta"
              ? `https://raw.githubusercontent.com/harmonyland/harmony/main/deploy.ts`
              : `https://deno.land/x/harmony@${version}/deploy.ts`,
        },
      })
    );
  }
}) as any);
