import React from 'react';
import { Text } from 'react-native';
import { LastProjectsPage } from 'screens/last-projects/last-projects.screen';
import { useGetAllPublicProjects } from 'screens/last-projects/last-projects.service';

export interface LastProjectsPageState {}

export const LastProjectsContainer = () => {
	const { loading } = useGetAllPublicProjects();

	return <>{loading ? <Text>Loading...</Text> : <LastProjectsPage />}</>;
};
