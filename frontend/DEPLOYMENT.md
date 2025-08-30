# Netlify Deployment Guide

This project is configured for deployment on Netlify using the `@netlify/plugin-nextjs` plugin.

## Configuration Files

### netlify.toml
The `netlify.toml` file contains the build configuration:
- Base directory: `.` (current directory)
- Build command: `npm run build`
- Node.js version: 18
- Uses `@netlify/plugin-nextjs` plugin for optimal Next.js support

### Environment Variables
Make sure to set these environment variables in your Netlify dashboard:
- `NEXT_PUBLIC_API_URL`: Your backend API URL
- `GOOGLE_API_KEY`: Google API key for services
- `GROQ_API_KEY`: Groq API key
- `LANGSMITH_API_KEY`: LangSmith API key
- `LANGSMITH_ENDPOINT`: LangSmith endpoint
- `LANGSMITH_PROJECT`: LangSmith project name
- `LANGSMITH_TRACING`: LangSmith tracing setting
- `TAVILY_API_KEY`: Tavily API key

## Deployment Process

1. Connect your GitHub repository to Netlify
2. Set the build directory to `frontend`
3. Set the build command to `npm run build`
4. Set the publish directory to `.next` (handled by the plugin)
5. Configure environment variables in Netlify dashboard
6. Deploy!

## Troubleshooting

If you encounter the "publish directory cannot be the same as base directory" error:
- Make sure you're using the `@netlify/plugin-nextjs` plugin
- Don't manually specify the publish directory in netlify.toml
- Let the plugin handle the build process automatically

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
