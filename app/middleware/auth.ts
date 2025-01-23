export default defineNuxtRouteMiddleware(async (to, _from) => {
	const user = useDirectusUsers();
	const userData = await user.readMe();
	console.log(userData);

	if (!userData || userData.status !== 'active') {
		return navigateTo('/');
	}
});
