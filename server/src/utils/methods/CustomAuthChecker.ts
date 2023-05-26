// import { Context } from "apollo-server-core";
// import { MemberServices } from "services/MemberServices";
// import { AuthChecker } from "type-graphql";

// export class CustomAuthChecker implements AuthChecker<Context> {
//     // inject dependency
//     constructor(private readonly userRepository: Repository<User>) {}

//     check({ root, args, context, info }: ResolverData<ContextType>, roles: string[]) {
//         const _MemberService = new MemberServices()

//       const memberId = _MemberService.findById(context.token);
//       // use injected service
//       const member = this.memberRepository.getById(memberId);

//       // custom logic here, e.g.:
//       return member % 2 === 0;
//     }
//   }
