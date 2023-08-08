import P from 'components/p';
import { SafeAreaView, ScrollView } from 'react-native';
import { ProjectCard } from 'screens/last-projects/_components/project-card';
import { ProjectState } from 'screens/last-projects/last-projects.service';

interface LastProjectsPageProps {
	projects: ProjectState[] | null;
}

export const LastProjectsPage = ({ projects }: LastProjectsPageProps) => {
	return (
		<>
			<SafeAreaView className='flex-1'>
				{projects !== null && projects.length !== 0 ? (
					<ScrollView className='flex flex-col px-2 h-full'>
						{projects.map((project, index) => (
							<ProjectCard key={index} project={project} containerStyle='my-1' />
						))}
					</ScrollView>
				) : (
					<P containerStyle='flex-1 justify-center items-center'>No projects for the moment.</P>
				)}
			</SafeAreaView>
		</>
	);
};
