import { SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProjectCard } from 'screens/last-projects/_components/project-card';
import { ProjectState } from 'screens/last-projects/last-projects.service';

interface LastProjectsPageProps {
	projects: ProjectState[] | null;
}

export const LastProjectsPage = ({ projects }: LastProjectsPageProps) => {
	return (
		<>
			<SafeAreaView>
				<ScrollView className='flex flex-col px-2'>
					{projects !== null
						? projects.map((project, index) => (
								<ProjectCard key={index} project={project} containerStyle='my-1' />
						  ))
						: null}
				</ScrollView>
			</SafeAreaView>
		</>
	);
};
