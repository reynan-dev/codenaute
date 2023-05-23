import { Server } from 'utils/configs/server';

import { MemberResolver } from 'resolvers/MemberResolver';
import { FileProjectResolver } from 'resolvers/FileProjectResolver';
import { ProjectResolver } from 'resolvers/ProjectResolver';
import { RoutingTokenResolver } from 'resolvers/RoutingTokenResolver';

Server.includeResolvers([
	MemberResolver,
	FileProjectResolver,
	ProjectResolver,
	RoutingTokenResolver
]);

Server.start();
