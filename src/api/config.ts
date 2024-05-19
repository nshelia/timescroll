const isDev = process.env.NODE_ENV !== 'production';

const IP_ADDRESS = true ? 'localhost' : '192.168.0.197';

export const WORKERS = (() => ({
  USERS_WORKER: isDev
    ? `http://${IP_ADDRESS}:8785/`
    : 'https://worker-users.greetle.workers.dev',
}))();

export const messagingServerURL = (() => {
  return !isDev ? 'https://messaging.greetai.co' : `http://${IP_ADDRESS}:9090`;
})();
