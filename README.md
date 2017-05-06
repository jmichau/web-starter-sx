# web-starter-sx
web-starter-sx is example different approach to provides transpiling Stylus and JSX using Gulp 4
## Directory Layout
```shell
├── dist/                       # Folder for compiled output
├── src/                        # Application source code
│   ├── app/                    # JSX source code
│   │   └── concat.json         # *.jsx concatenate sequence
│   ├── style/                  # Stylus source code
│   │   └── main.styl           # Stylus entry point
│   └── index.html              # index.html include js, and css files
├── node_modules/               # 3rd-party libraries and utilities
├── gulpfile.js                 # Gulpfile
└── package.json                # The list of project dependencies and NPM scripts
```

## How this exacly work?
- When save the `src/app/**/*.jsx` file, gulp transpiling all .jsx files to .js and concatenate them together as specified in `src/app/concat.json`
- When save the `src/app/**/*.styl` file, gulp transpiling .styl files whose was included in `main.styl` entry point file.

## Usage
### Install:
```shell
git clone github.com/mj420/web-starter-sx
npm install
```
### shell commands:
```shell
npm run dev             # Compiles the app and opens it in a browser with "live reload"
npm run build           # Just compiles the app
```

you can simply add vendor js files by adding it at the begining of the `concat.json` file:
```json
[
    "../../node_modules/path/to/framework.file",
    "main.jsx"
]
```
but make sure that you `npm install` your vendor library before include it.
