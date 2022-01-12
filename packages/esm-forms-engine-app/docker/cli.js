#!/usr/bin/env node
'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt (value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled (value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected (value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step (result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const yargs = __importStar(require('yargs'));
const child_process_1 = require('child_process');
const path_1 = require('path');
const utils_1 = require('./utils');
const runner = (0, path_1.resolve)(__dirname, `runner.js`);
const root = (0, path_1.resolve)(__dirname, '..');
function runCommand (type, args) {
  const ps = (0, child_process_1.fork)(runner, [], { cwd: root });
  ps.send({
    type,
    args,
  });
  ps.on('exit', code => process.exit(code || 0));
}
yargs.command(
  'debug',
  'Starts a new debugging session of the OpenMRS app shell. This uses Webpack as a debug server with proxy middleware.',
  argv =>
    argv
      .number('port')
      .default('port', 8080)
      .describe('port', 'The port where the dev server should run.')
      .number('host')
      .default('host', 'localhost')
      .describe('host', 'The host name or IP for the server to use.')
      .string('backend')
      .default('backend', 'https://openmrs-spa.org/')
      .describe('backend', 'The backend to proxy API requests to.')
      .boolean('support-offline')
      .describe('support-offline', 'Determines if a service worker should be installed for offline support.')
      .default('support-offline', true)
      .string('spa-path')
      .default('spa-path', '/openmrs/spa/')
      .describe('spa-path', 'The path of the application on the target server.')
      .string('api-url')
      .default('api-url', '/openmrs/')
      .describe('api-url', 'The URL of the API. Can be a path if the API is on the same target server.')
      .string('page-title')
      .default('page-title', 'OpenMRS')
      .describe('page-title', 'The title of the web app usually displayed in the browser tab.')
      .array('config-url')
      .default('config-url', [])
      .describe('config-url', 'The URL to a valid frontend configuration. Can be used multiple times.')
      .boolean('run-project')
      .default('run-project', false)
      .describe('run-project', 'Runs the project in the current directory fusing it with the specified import map.')
      .array('sources')
      .default('sources', ['.'])
      .describe('sources', 'Runs the projects from the provided source directories. Can be used multiple times.')
      .array('shared-dependencies')
      .default('shared-dependencies', [])
      .describe('shared-dependencies', 'The additional shared dependencies besides the ones from the app shell.')
      .string('importmap')
      .default('importmap', 'importmap.json')
      .describe(
        'importmap',
        'The import map to use. Can be a path to a valid import map to be taken literally, an URL, or a fixed JSON object.',
      ),
  args =>
    __awaiter(void 0, void 0, void 0, function * () {
      return runCommand(
        'runDebug',
        Object.assign(
          Object.assign(
            {
              apiUrl: args['api-url'],
              spaPath: args['spa-path'],
              configUrls: args['config-url'],
              pageTitle: args['page-title'],
              supportOffline: args['support-offline'],
            },
            args,
          ),
          {
            importmap: (0, utils_1.proxyImportmap)(
              yield (0, utils_1.mergeImportmap)(
                yield (0, utils_1.getImportmap)(args.importmap, args.port),
                (args['run-project'] || args.runProject) &&
                  (yield (0, utils_1.runProject)(args.port, args['shared-dependencies'], args.sources)),
              ),
              args.backend,
              args.host,
              args.port,
            ),
          },
        ),
      );
    }),
);
yargs.command(
  'develop',
  'Starts a new frontend module development session with the OpenMRS app shell.',
  argv =>
    argv
      .number('port')
      .default('port', 8080)
      .describe('port', 'The port where the dev server should run.')
      .string('host') // ISSUE FIX: Change to string to allow IP notation
      .default('host', '0.0.0.0') // FIX: Serve on 0.0.0.0 and not on localhost
      .describe('host', 'The host name or IP for the server to use.')
      .string('backend')
      .default('backend', 'https://openmrs-spa.org/')
      .describe('backend', 'The backend to proxy API requests to.')
      .string('spa-path')
      .default('spa-path', '/openmrs/spa/')
      .describe('spa-path', 'The path of the application on the target server.')
      .string('api-url')
      .default('api-url', '/openmrs/')
      .describe('api-url', 'The URL of the API. Can be a path if the API is on the same target server.')
      .boolean('open')
      .default('open', true)
      .describe('open', 'Immediately opens the SPA page URL in the browser.')
      .array('config-url')
      .default('config-url', [])
      .describe('config-url', 'The URL to a valid frontend configuration. Can be used multiple times.')
      .array('sources')
      .default('sources', ['.'])
      .describe('sources', 'Runs the projects from the provided source directories. Can be used multiple times.')
      .array('shared-dependencies')
      .default('shared-dependencies', [])
      .describe('shared-dependencies', 'The additional shared dependencies besides the ones from the app shell.')
      .string('importmap')
      .default('importmap', 'importmap.json')
      .describe(
        'importmap',
        'The import map to use. Can be a path to a valid import map to be taken literally, an URL, or a fixed JSON object.',
      ),
  args =>
    __awaiter(void 0, void 0, void 0, function * () {
      return runCommand(
        'runDevelop',
        Object.assign(
          Object.assign({ apiUrl: args['api-url'], spaPath: args['spa-path'], configUrls: args['config-url'] }, args),
          {
            importmap: (0, utils_1.proxyImportmap)(
              yield (0, utils_1.mergeImportmap)(
                yield (0, utils_1.getImportmap)(args.importmap, args.port),
                args.sources[0] !== false &&
                  (yield (0, utils_1.runProject)(args.port, args['shared-dependencies'], args.sources)),
              ),
              args.backend,
              args.host,
              args.port,
            ),
          },
        ),
      );
    }),
);
yargs.command(
  'build',
  'Builds a new app shell.',
  argv =>
    argv
      .string('target')
      .default('target', 'dist')
      .describe('target', 'The target directory where the build artifacts will be stored.')
      .string('registry')
      .default('registry', 'https://registry.npmjs.org/')
      .describe('registry', 'The NPM registry used for getting the packages.')
      .boolean('fresh')
      .describe('fresh', 'Determines if the output directory should be cleaned before the run.')
      .boolean('support-offline')
      .describe('support-offline', 'Determines if a service worker should be installed for offline support.')
      .default('support-offline', true)
      .string('build-config')
      .describe('build-config', 'Path to a SPA build config JSON')
      .string('spa-path')
      .default('spa-path', '/openmrs/spa/')
      .describe('spa-path', 'The path of the application on the target server.')
      .string('page-title')
      .default('page-title', 'OpenMRS')
      .describe('page-title', 'The title of the web app usually displayed in the browser tab.')
      .string('api-url')
      .default('api-url', '/openmrs/')
      .describe('api-url', 'The URL of the API. Can be a path if the API is on the same target server.')
      .array('config-url')
      .default('config-url', [])
      .describe(
        'config-url',
        'The URL to a frontend configuration. Can be used multiple times. Resolved by the client during initialization.',
      )
      .array('config-path')
      .default('config-path', [])
      .describe(
        'config-path',
        'The path to a frontend configuration file. Can be used multiple times. The file is copied directly into the build directory.',
      )
      .string('importmap')
      .default('importmap', 'importmap.json')
      .describe(
        'importmap',
        'The import map to use. Can be a path to an import map to be taken literally, an URL, or a fixed JSON object.',
      )
      .boolean('download-coreapps')
      .default('download-coreapps', false)
      .describe(
        'download-coreapps',
        'Downloads and bundles the core apps. For cases where the core apps are not in the import map.',
      ),
  args =>
    __awaiter(void 0, void 0, void 0, function * () {
      return runCommand(
        'runBuild',
        Object.assign(
          Object.assign(
            {
              apiUrl: args['api-url'],
              spaPath: args['spa-path'],
              configUrls: args['config-url'],
              configPaths: args['config-path'].map(p => (0, path_1.resolve)(process.cwd(), p)),
              pageTitle: args['page-title'],
              supportOffline: args['support-offline'],
              downloadCoreapps: args['download-coreapps'],
            },
            args,
          ),
          {
            importmap: args.importmap,
            buildConfig: args['build-config'] && (0, path_1.resolve)(process.cwd(), args['build-config']),
            target: (0, path_1.resolve)(process.cwd(), args.target),
          },
        ),
      );
    }),
);
yargs.command(
  'assemble',
  'Assembles an import map incl. all required resources.',
  argv =>
    argv
      .string('target')
      .default('target', 'dist')
      .describe('target', 'The target directory where the gathered artifacts will be stored.')
      .string('registry')
      .default('registry', 'https://registry.npmjs.org/')
      .describe('registry', 'The NPM registry used for getting the packages.')
      .string('config')
      .default('config', 'spa-build-config.json')
      .describe('config', 'Path to a SPA build config JSON.')
      .boolean('fresh')
      .describe('fresh', 'Determines if the output directory should be cleaned before the run.')
      .default('fresh', false)
      .choices('mode', ['config', 'survey'])
      .default('mode', 'survey')
      .describe(
        'mode',
        'The source of the frontend modules to assemble. `config` uses a configuration file specified via `--config`. `survey` starts an interactive command-line survey.',
      ),
  args =>
    runCommand(
      'runAssemble',
      Object.assign(Object.assign({}, args), {
        registry: (0, utils_1.trimEnd)(args.registry, '/'),
        config: (0, path_1.resolve)(process.cwd(), args.config),
        target: (0, path_1.resolve)(process.cwd(), args.target),
      }),
    ),
);
yargs.command(
  ['start', '$0'],
  'Starts the app shell using the provided configuration. This uses express for serving static files with some proxy middleware.',
  argv =>
    argv
      .number('port')
      .default('port', 8080)
      .describe('port', 'The port where the dev server should run.')
      .number('host')
      .default('host', 'localhost')
      .describe('host', 'The host name or IP for the server to use.')
      .string('backend')
      .default('backend', 'https://openmrs-spa.org/')
      .describe('backend', 'The backend to proxy API requests to.')
      .boolean('open')
      .default('open', false)
      .describe('open', 'Immediately opens the SPA page URL in the browser.'),
  args => runCommand('runStart', Object.assign({}, args)),
);
yargs
  .epilog(
    'The SPA build config JSON is a JSON file, typically `frontend.json`, which defines parameters for the `build` and `assemble` ' +
      'commands. The keys used by `build` are:\n' +
      '  `apiUrl`, `spaPath`, `configPaths`, `configUrls`, `importmap`, `pageTitle`, and `supportOffline`;\n' +
      'each of which is equivalent to the corresponding command line argument (see `openmrs build --help`). ' +
      'Multiple values provided to `configPaths` and `configUrls` shoud be comma-separated.\n' +
      'The keys used by `assemble` are:\n' +
      '  frontendModules  \tAn object which specifies which frontend modules to include. It should have package names ' +
      'for keys and versions for values.\n' +
      '  publicUrl  \tThe URL at which the frontend modules will be made available. Can be relative to the importmap. ' +
      'Defaults to `.` (which means they will be colocated with the import map).\n\n' +
      'For more information visit https://github.com/openmrs/openmrs-esm-core.',
  )
  .help()
  .demandCommand()
  .strict().argv;
