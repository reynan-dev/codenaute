import { FileProjectResolver } from 'resolvers/FileProjectResolver';
import { MemberResolver } from 'resolvers/MemberResolver';
import { ProgrammingLanguageResolver } from 'resolvers/ProgrammingLanguageResolver';
import { ProjectResolver } from 'resolvers/ProjectResolver';
import { RoutingTokenResolver } from 'resolvers/RoutingTokenResolver';
import { SandpackTemplateResolver } from 'resolvers/SandpackTemplate';
import { Server } from 'utils/configs/server';

Server.includeResolvers([
	MemberResolver,
	FileProjectResolver,
	ProgrammingLanguageResolver,
	ProjectResolver,
	RoutingTokenResolver,
	SandpackTemplateResolver
]);

Server.start();
