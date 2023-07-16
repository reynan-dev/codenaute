import { Server } from 'utils/configs/server';

import { MemberResolver } from 'resolvers/MemberResolver';
import { ProjectResolver } from 'resolvers/ProjectResolver';
import { RoutingTokenResolver } from 'resolvers/RoutingTokenResolver';

Server.includeResolvers([MemberResolver, ProjectResolver, RoutingTokenResolver]);

Server.start();
