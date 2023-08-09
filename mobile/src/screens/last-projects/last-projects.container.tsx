import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { LastProjectsPage } from 'screens/last-projects/last-projects.screen';
import { ProjectState, useGetAllPublicProjects } from 'screens/last-projects/last-projects.service';

export interface LastProjectsPageState {}

export const LastProjectsContainer = () => {
	const [projects, setProjects] = useState<ProjectState[] | null>(null);

	const { loading } = useGetAllPublicProjects(setProjects);

	return (
		<>
			{loading ? (
				<SafeAreaView className='flex-1'>
					<ActivityIndicator className='flex-1 justify-center items-center' />
				</SafeAreaView>
			) : (
				<LastProjectsPage projects={projects} />
			)}
		</>
	);
};
