// import Svg from 'components/svg';
import Svg from 'components/svg';
import { SvgIcon } from 'components/svg/svg-icon';
import { Text, View } from 'react-native';
import { ProjectCard } from 'screens/last-projects/_components/project-card';
import { LastProjectsPageState } from 'screens/last-projects/last-projects.container';
import { ProjectState } from 'screens/last-projects/last-projects.service';
import colors from 'tailwindcss/colors';

interface LastProjectsPageProps {
	projects: ProjectState[] | null;
}

export const LastProjectsPage = ({ projects }: LastProjectsPageProps) => {
	return (
		<>
			<View>
				{projects !== null
					? projects.map((project, index) => <ProjectCard key={index} project={project} />)
					: null}
			</View>
		</>
	);
};
