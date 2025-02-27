import React from 'react';

const NotFound = () => {
  return (
	<main class="main d-flex justify-content-center w-100">
		<div class="container d-flex flex-column">
			<div class="row h-100">
				<div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div class="d-table-cell align-middle">

						<div class="text-center">
							<h1 class="display-1 font-weight-bold">404</h1>
							<p class="h1">Page not found.</p>
							<p class="h2 font-weight-normal mt-3 mb-4">The page you are looking for might have been removed.</p>
							<a href="dashboard-default.html" class="btn btn-primary btn-lg" href="/dashboard">Return to website</a>
						</div>

					</div>
				</div>
			</div>
		</div>
	</main>
  )
}

export default NotFound;