import { NextResponse } from 'next/server';

export async function GET() {
  // Basic health check
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  };

  // You can add more health checks here
  // - Database connection
  // - Redis connection
  // - External API status
  // - Memory usage
  // - Disk space

  // const dbStatus = await checkDatabase();
  // const redisStatus = await checkRedis();

  return NextResponse.json(healthData);
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}
