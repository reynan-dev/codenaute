import { Server } from 'utils/configs/server';

import { MemberResolver } from 'resolvers/MemberResolver';
import { FileProjectResolver } from 'resolvers/FileProjectResolver';
import { ProgrammingLanguageResolver } from 'resolvers/ProgrammingLanguageResolver';
import { ProjectResolver } from 'resolvers/ProjectResolver';
import { RoutingTokenResolver } from 'resolvers/RoutingTokenResolver';
import { SandpackTemplateResolver } from 'resolvers/SandpackTemplate';

Server.includeResolvers([
	MemberResolver,
	FileProjectResolver,
	ProgrammingLanguageResolver,
	ProjectResolver,
	RoutingTokenResolver,
	SandpackTemplateResolver
]);

Server.start();
