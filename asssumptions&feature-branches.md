# Assumptions made for this coding challenge.
I'm going to treat the feature expectations and requirements as their own iterations by feature branch with the following identifiers for ease of use and clarification.
Usually I'd expect my feature requirements and expectations for a given sprint to come from a project management tool such as JIRA, and this document is intended to mimic this issue ticket style.

## Feature branches:

### FT-100-java-spring-initial-setup
As a java developer I want to have a basic program written in Java Spring and tested with JUnit for MVC usage, compiled and ready for coming iterations.
Acceptance criteria: Java program compiles without errors and tests pass for basic skeleton scenarios such as hello world.

### FT-101-openapi-boilerplate-code
As a java developer I want to create boilerplated code to mimic the sorts of logic which will be required.
This will enable future iterations to use this logic and provides a good template for another developer to work on.
Acceptance criteria: Boilerplated code with logic for Controller methods matching their openapi specifications, parameter testing is required for basic openapi related specifications but not the inner service logic (e.g. The method returns 200 and "OK").

### BUG-100-api-context-path-fix
As a java tester I want to be able to avoid needing to provide the full URL path, this should be inherited by the test classes from application.properties/application-test.properties file.
Acceptance criteria: The context should be passed correctly with "server.servlet.context-path" for controllers and their tests.
e.g. `mockMvc.perform(get("/health")` should work and not require additional "/api/v1/url-shortener/" path to be added in to the mockmvc test.

### FT-200-angular-initial-setup
As an angular developer I want to have a frontend UI which will complement the backend API.
This will include Karma as the testing suite and will add simple components to prove the angular frontend is working.
Acceptance criteria: Angular serves html content to the localhost domain and basic karma tests are passing.

### FT-201-angular-services-and-api-integration
As a developer of the url-shortener site I want to be able to see the outputs coming from the backend UI.
Acceptance criteria: Designed and implemented an angular service to prove that backend interactions are being sent back to UI as expected (output changes may be required in backend).