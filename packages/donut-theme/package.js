Package.describe({
  summary: 'Reusable UI Components you can sink your teeth into',
  version: '0.0.1',
  name: 'donut-theme'
});

Package.onUse(function (api) {

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  // automatic (let the package specify where it's needed)

  api.use([                
    'iron:router'                   
  ]);

  // client

  api.use([
    'donut-components',
    'fourseven:scss@2.0.0'      
  ], ['client']);

  api.add_files([
  //   'lib/custom_fields.js',
  //   'lib/hooks.js',
  //   'lib/main.js',
    // 'lib/routes.js',
  //   'lib/settings.js',
  //   'lib/templates.js',
  ], ['client', 'server']);

  // client

  api.add_files([
    'client/compatibility/animations.js',

    //stylesheets
    'client/stylesheets/_items.scss',
    'client/stylesheets/_shelf.scss',
    'client/stylesheets/_pages.scss',
    'client/stylesheets/_modal.scss',
    'client/stylesheets/_header.scss',
    'client/stylesheets/_zindex.scss',
    'client/stylesheets/_nav.scss',
    'client/stylesheets/theme.scss'
  ], ['client']);

  api.export([

  ]);

});