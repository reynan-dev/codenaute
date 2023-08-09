import { Server } from 'utils/configs/server';

import { MemberResolver } from 'resolvers/MemberResolver';
import { ProjectResolver } from 'resolvers/ProjectResolver';

Server.includeResolvers([MemberResolver, ProjectResolver]);

Server.start();
