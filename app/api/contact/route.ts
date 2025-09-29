import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    // Validate the request data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Format the message for Slack
    const slackMessage = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "New Contact Form Submission",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Name:*\n${name}`,
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${email}`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Message:*\n${message}`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `Submitted on ${new Date().toLocaleString()}`,
            },
          ],
        },
      ],
    };

    // Send the message to Slack
    const slackWebhookUrl = "process.env.SLACK_WEBHOOK_URL";

    if (!slackWebhookUrl) {
      console.error("Slack webhook URL not configured");
      return NextResponse.json(
        { error: "Slack webhook not configured" },
        { status: 500 }
      );
    }

    const slackResponse = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackMessage),
    });

    if (!slackResponse.ok) {
      console.error(
        "Error sending message to Slack:",
        await slackResponse.text()
      );
      return NextResponse.json(
        { error: "Failed to send message to Slack" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
