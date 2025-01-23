<template>
	<div class="border-b shadow-md px-16">
		<nav class="flex justify-between items-center py-4">
			<ul class="flex items-center gap-4">
				<li>
					<HoverLink :to="'/'">ACCUEIL</HoverLink>
				</li>
				<li><HoverLink :to="'/'">NOS COLLECTIONS</HoverLink></li>
			</ul>
			<NuxtLink class="w-fit flex flex-col cursor-pointer" to="/">
				<h1 class="text-2xl font-serif">LES DOUCES MERVEILLES</h1>
				<div class="logo-divider font-serif">Chocolat</div>
			</NuxtLink>

			<ul class="flex items-center gap-4">
				<li><HoverLink :to="'/'">A PROPOS</HoverLink></li>
				<li><HoverLink :to="'/'">CONTACT</HoverLink></li>
				<li>
					<BaseTooltip message="Mon panier">
						<NuxtLink
							v-if="useUserStore().isAuthenticated"
							to="/cart"
							aria-label="Tooltip">
							<Icon
								name="material-symbols-light:shopping-bag-outline-sharp"
								size="24" />
						</NuxtLink>

						<NuxtLink v-else to="/account/login" aria-label="Tooltip">
							<Icon
								name="material-symbols-light:shopping-bag-outline-sharp"
								size="24" />
						</NuxtLink>
					</BaseTooltip>
				</li>

				<li>
					<BaseTooltip message="Mon compte">
						<NuxtLink v-if="useUserStore().isAuthenticated" to="/profil">
							<Icon
								name="material-symbols-light:person-outline-rounded"
								size="24" />
						</NuxtLink>

						<NuxtLink v-else to="/account/login">
							<Icon
								name="material-symbols-light:person-outline-rounded"
								size="24" />
						</NuxtLink>
					</BaseTooltip>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
