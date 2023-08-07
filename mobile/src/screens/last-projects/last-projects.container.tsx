import React, { useState } from 'react';
import { Text } from 'react-native';
import { LastProjectsPage } from 'screens/last-projects/last-projects.screen';
import { ProjectState, useGetAllPublicProjects } from 'screens/last-projects/last-projects.service';

export interface LastProjectsPageState {}

export const LastProjectsContainer = () => {
	const [projects, setProjects] = useState<ProjectState[] | null>(null);

	const { loading } = useGetAllPublicProjects(setProjects);

	return <>{loading ? <Text>Loading...</Text> : <LastProjectsPage projects={projects} />}</>;
};
