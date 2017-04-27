# web-starter
web starter kit is example different approach to provides transpiling Stylus and JSX
## Directory Layout
```shell
├── dist/                       # Folder for compiled output
├── src/                        # Application source code
│   ├── app/                    # JSX source code
│   │  └── concat.json          # *.jsx concatenate sequence
│   ├── style/                  # Stylus source code
│   │  └── main.styl            # Stylus entry point
│   └── index.html              # index.html include js, and css files
├── node_modules/               # 3rd-party libraries and utilities
├── gulpfile.js                 # Gulpfile
└── package.json                # The list of project dependencies and NPM scripts
```

## How this exacly work?
- When save the `src/app/**/*.jsx` file, gulp transpiling all .jsx files to .js and concatenate them together as specified in `src/app/concat.json`
- When save the `src/app/**/*.styl` file, gulp transpiling .styl files whose was included in `main.styl` entry point file.

## Usage
### shell commands:
```shell
gulp dev                # Compiles the app and opens it in a browser with "live reload"
gulp build              # Just compiles the app
```