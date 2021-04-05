# Sweater CLI

## Project S.W.E.A.T.E.R.
### ScriptDrop Weather Evaluation And Thermal Excellence Recommendations
Small CLI application to:
1. Collect the city name and state from the user.
2. Use the OpenWeather API to fetch the forecast for a given city.
3. Read a configuration file containing the possible recommendations.  We suspect that rules for recommending particular items are subject to rapid changes.
To support that, we’ll try to make this subsystem fairly data driven.
   - See attached JSON file for a sample configuration file.
4. Output zero, one, or many recommendations based on the city’s forecast.

### Usage

Run node in project directory

```node .```

Prompt will request user input for City and State name of choice.  Not case sensitive.

### Dependencies
- file-system
- js-yaml
- prompt
- xmlhttprequest

### Assumptions Made
User knows what CLI tool is used for (no need for more detailed request message)


### Stumbling Blocks
This was a really fun project for me, as it was very new to me.  This was my first project in node, and my first CLI project.  It involved a few Hello World type projects, and a lot of trial and error.
It was also interesting calling an API within a CLI tool, and learning more about node.

### Future Enhancements:
- Case checking for user input
- More logic, more scenarios to consider, logic to consider more of the API resultset - current state only takes 1st response.
- Colored output for readability
- Accessibility considerations
- More customized output
- More user input to allow the user to ask for more specific recommendations

### Next Steps:
- TDD - I would have liked to do some test driven development, and more unit testing.  Javascript TDD is something I've never done - and given the time, I would have liked to learn and practice.
