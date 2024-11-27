export async function GET() {
  return new Response(
    JSON.stringify({
      city: "London",
      state: "N/A",
      country: "GB",
      slack_id: "U059VC0UDEU",
      extra: "check me out at https://skyfall.dev!",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
