import config from './config'

const project = 'frictionless';
export const streamId = Math.random().toString(36).slice(2);

export const a = (data: any) => fetch(config.analytics.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ project, streamId, data }) })

export default a;