import { Server }      from '@nestjs.pro/common/dist/server/Server';
import { PostsModule } from './posts/PostsModule';

const serverUrls = [];

serverUrls.push('https://api.streamnvr.com/registration');

if (Server.getEnvironment() === 'local') {

    serverUrls.push('http://localhost:10096');

} else if (Server.getEnvironment() === 'docker') {

    serverUrls.push('http://localhost:18080');

}

Server.bootstrap(PostsModule, 'modules', Number(process.env.PORT) || 3000, {

    path: '/swagger',
    title: 'k8specs API',
    description: 'Regk8specsistration Management API',
    version: '0.0.1',
    tags: [],
    contactName: 'support@k8specs.com',
    contactEmail: 'support@k8specs.com',
    contactUrl: 'https://k8specs.com',
    docsDescription: 'docs',
    docsUrl: 'https://k8specs.com',
    serverUrls

}, [

    'https://signup.streamnvr.com',
    'https://app.streamnvr.com',
    'http://localhost:10001'

], null);
