import axios from 'axios';
import _ from 'lodash';

import logger from './logger.ts';

// Support multiple env var names for convenience
const proxyEnv = process.env.LOCAL_PROXY
    || process.env.PROXY_URL
    || process.env.HTTPS_PROXY
    || process.env.HTTP_PROXY
    || process.env.ALL_PROXY;

try {
	if (_.isString(proxyEnv) && proxyEnv.trim().length > 0) {
		const proxyUrl = new URL(proxyEnv);
		const protocol = (proxyUrl.protocol || '').replace(':', '');
		const host = proxyUrl.hostname;
		const port = Number(proxyUrl.port || (protocol === 'https' ? 443 : 80));
		const username = proxyUrl.username;
		const password = proxyUrl.password;

		// Only configure axios built-in proxy for http/https proxies
		if (['http', 'https'].includes(protocol)) {
			axios.defaults.proxy = {
				protocol,
				host,
				port,
				...(username ? { auth: { username, password } } : {})
			} as any;
			logger.info(`HTTP proxy enabled for axios -> ${protocol}://${host}:${port}`);
		} else {
			logger.warn(`Unsupported proxy protocol for axios defaults: ${protocol}. Falling back to environment variables.`);
			process.env.HTTPS_PROXY = proxyEnv;
			process.env.HTTP_PROXY = proxyEnv;
		}
		// Ensure common no-proxy hosts
		process.env.NO_PROXY = process.env.NO_PROXY || 'localhost,127.0.0.1';
	} else {
		logger.info('No proxy configured. Axios will connect directly.');
	}
} catch (err) {
	logger.warn('Failed to configure proxy from environment. Proceeding without proxy.');
}