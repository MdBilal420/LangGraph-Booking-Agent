# Netlify Deployment Guide

This project is configured for deployment on Netlify using the `@netlify/plugin-nextjs` plugin.

## Configuration Files

### netlify.toml
The `netlify.toml` file contains the build configuration:
- Base directory: `.` (current directory)
- Build command: `npm run build`
- Node.js version: 18
- Uses `@netlify/plugin-nextjs` plugin for optimal Next.js support

### _redirects
The `public/_redirects` file handles client-side routing:
```
/*    /index.html   200
```

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

## Netlify Build Settings

In your Netlify dashboard, make sure these settings are correct:

### Build Settings
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `.next` (or leave empty to let plugin handle it)

### Environment Variables
Add all required environment variables in the Environment variables section.

## Troubleshooting

### 404 Errors
If you're getting 404 errors after deployment:

1. **Check the _redirects file**: Make sure `public/_redirects` contains `/*    /index.html   200`
2. **Verify netlify.toml**: Ensure the redirects section is properly configured
3. **Check build logs**: Look for any build errors in Netlify build logs
4. **Clear cache**: Try clearing Netlify cache and redeploying
5. **Check plugin version**: Ensure `@netlify/plugin-nextjs` is up to date

### Build Errors
If you encounter the "publish directory cannot be the same as base directory" error:
- Make sure you're using the `@netlify/plugin-nextjs` plugin
- Don't manually specify the publish directory in netlify.toml
- Let the plugin handle the build process automatically

### Common Issues
- **Missing environment variables**: Ensure all required env vars are set in Netlify
- **Plugin conflicts**: Make sure only one Next.js plugin is configured
- **Build timeout**: Increase build timeout if needed in Netlify settings

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Testing Deployment Locally

You can test the production build locally:

```bash
npm run build
npm run start
```

This will help identify any issues before deploying to Netlify.
