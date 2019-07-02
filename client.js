import { ReactInstance, Location, Surface } from 'react-360-web';
import KeyboardModule from 'react-360-keyboard/KeyboardModule';

function init(bundle, parent, options = {}) {
    const r360 = new ReactInstance(bundle, parent, {
        fullScreen: true,
        // 1.) add the NativeModule to your instance
        nativeModules: [KeyboardModule.addModule],
        ...options
    });

    const profilePanel = new Surface(400, 600, Surface.SurfaceShape.Flat);
    profilePanel.setAngle(-1.5, 0);
    const infoPanel = new Surface(1200, 600, Surface.SurfaceShape.Flat);
    infoPanel.setAngle(1.5, 0);
    r360.renderToSurface(
        r360.createRoot('SearchPanel'),
        r360.getDefaultSurface()
    );
    r360.renderToSurface(r360.createRoot('ProfilePanel'), profilePanel);
    r360.renderToSurface(r360.createRoot('InfoPanel'), infoPanel);

    r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
    // 2.) pass the instance to the NativeModule, do this after creating your main
    //     surface to ensure the keyboard is rendered on top of your scene
    KeyboardModule.setInstance(r360);
}

window.React360 = { init };
