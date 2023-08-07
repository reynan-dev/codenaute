import { Text, View } from 'react-native';
import { ProjectCard } from 'screens/last-projects/_components/project-card';
import { LastProjectsPageState } from 'screens/last-projects/last-projects.container';
import { ProjectState } from 'screens/last-projects/last-projects.service';
interface LastProjectsPageProps {
	projects: ProjectState[] | null;
}

export const LastProjectsPage = ({ projects }: LastProjectsPageProps) => {
	return (
		<View>
			{projects !== null ? projects.map((project) => <ProjectCard project={project} />) : null}
		</View>
	);
};
