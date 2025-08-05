// src/app/api/robots/route.ts

import { NextRequest, NextResponse } from 'next/server';

console.log('Loading API route file'); // This should show when Next.js loads the file

export async function GET(request: NextRequest) {
  console.log('=== API Route GET function called ===');

  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  console.log('Received URL parameter:', url);

  // Validate input
  if (!url) {
    console.log('❌ No URL provided');
    return NextResponse.json(
      { success: false, error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  console.log('✅ Starting to fetch robots.txt for:', url);

  try {
    // Normalize the URL
    let normalizedUrl = url.trim();
    if (
      !normalizedUrl.startsWith('http://') &&
      !normalizedUrl.startsWith('https://')
    ) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    // Build robots.txt URL
    const urlObj = new URL(normalizedUrl);
    const robotsUrl = `${urlObj.protocol}//${urlObj.host}/robots.txt`;

    console.log(`🌐 Fetching from: ${robotsUrl}`);

    // Fetch robots.txt
    const response = await fetch(robotsUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'AIO-Analysis-Tool/1.0',
      },
      signal: AbortSignal.timeout(10000),
    });

    console.log(
      `📡 Response status: ${response.status} ${response.statusText}`
    );

    if (!response.ok) {
      const errorResult = {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        url: robotsUrl,
      };
      console.log('❌ Error result:', errorResult);
      return NextResponse.json(errorResult);
    }

    const content = await response.text();
    console.log(`📄 Content received, length: ${content.length}`);
    console.log('First 100 chars:', content.substring(0, 100));

    if (!content.trim()) {
      const emptyResult = {
        success: false,
        error: 'Empty robots.txt file',
        url: robotsUrl,
      };
      console.log('❌ Empty result:', emptyResult);
      return NextResponse.json(emptyResult);
    }

    // Success!
    const successResult = {
      success: true,
      content,
      url: robotsUrl,
    };
    console.log('✅ Success! Returning content length:', content.length);
    return NextResponse.json(successResult);
  } catch (error) {
    console.error('💥 API Route error:', error);

    let errorMessage = 'Unknown error occurred';

    if (error instanceof DOMException && error.name === 'TimeoutError') {
      errorMessage = 'Request timeout - the server took too long to respond';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    const errorResult = {
      success: false,
      error: errorMessage,
      url: url,
    };
    console.log('❌ Final error result:', errorResult);
    return NextResponse.json(errorResult);
  }
}
