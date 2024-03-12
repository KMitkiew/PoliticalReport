import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthRequired() {
	const authenticated = localStorage.getItem('token');
	// const authenticated = true;

	if (!authenticated) {
		return (
			<Navigate
				to='/login'
			/>
		);
	}
	return <Outlet />;
}

