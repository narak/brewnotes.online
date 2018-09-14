import React from 'react';
import { Map } from 'immutable';

const IGNORED_TARGETS_TAGNAMES = ['INPUT', 'TEXTAREA'],
    ESCAPE_KEY = 27;

class ManageKeyBindings {
    constructor(source) {
        this._keyTrie = Map();
        this._listenersByID = {};
        this._keyStack = [];

        source.addEventListener('keydown', this.pushStack.bind(this));
        source.addEventListener('keyup', this.popStack.bind(this));
    }

    register = (comp, listeners) => {
        if (!Array.isArray(listeners)) {
            throw new Error('Cannot initialize keybinding listeners.');
        }
        if (!listeners.length) {
            return;
        }

        this._listenersByID[comp] = [];

        listeners.forEach(l => {
            if (!Array.isArray(l.keys)) {
                throw new Error('Invalid keys type.');
            }
            // Might throw invalid keyPath if another value already exists at given keypath,
            // but we want it to break so its obvious during development.
            this._keyTrie = this._keyTrie.setIn(l.keys, {
                callback: l.callback,
                desc: l.desc,
                group: l.group,
            });
            this._listenersByID[comp].push(l.keys);
        });
    };

    unregister = comp => {
        let listeners = this._listenersByID[comp];
        if (listeners) {
            this._keyTrie = this._keyTrie.withMutations(function(kt) {
                listeners.forEach(function(keys) {
                    kt.deleteIn(keys);
                });
            });
            this._listenersByID[comp] = undefined;
        }
    };

    popStack(e) {
        let listener = this._keyTrie.getIn(this._keyStack);

        //This is done so that once the key is up any instance of it should be removed
        //from the array as no further combination can occur with that key now
        if (this._keyStack.indexOf(e.keyCode) !== -1) {
            this._keyStack.splice(this._keyStack.indexOf(e.keyCode), 1);
        }

        if (listener) {
            let callback = listener.callback;
            if (typeof callback === 'function') {
                callback(this._keyStack);
            }
        } else {
            this._keyStack = [];
        }

        if (e.keyCode === ESCAPE_KEY) {
            this._keyStack = [];
            return;
        }
    }

    pushStack(e) {
        // console.log(e.keyCode);

        if (
            !e.defaultPrevented &&
            (IGNORED_TARGETS_TAGNAMES.indexOf(e.target.tagName.toUpperCase()) > -1 ||
                e.target.isContentEditable)
        ) {
            return;
        }

        //This is done to avoid adding the same key code again and again on press.
        if (this._keyStack.indexOf(e.keyCode) === -1) {
            this._keyStack.push(e.keyCode);
        }
    }

    getTrie = () => {
        return this._keyTrie;
    };
}

export const manager = new ManageKeyBindings(window);

/**
 * decorator to wrap given component in a portal and draw it outside of React flow.
 * This will append a div element at the end of document body and
 * push the decorated component into it.
 * @param {String} comp Decorated Component Key
 * @return {Object} Decorated Component
 */
export default function bindKeys(comp) {
    return function(DecoratedComponent) {
        const displayName =
            DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

        return class LayeredComponent extends React.PureComponent {
            static displayName = `layeredComponent(${displayName})`;

            static contextTypes = Object.assign({}, DecoratedComponent.contextTypes);

            render() {
                const keybind = {
                    register: this.register,
                    unregister: this.unregister,
                    bindings: manager._keyTrie,
                };
                return <DecoratedComponent {...this.props} keybind={keybind} />;
            }

            register = keyBinds => {
                manager.register(comp, keyBinds);
            };

            unregister = () => {
                manager.unregister(comp);
            };
        };
    };
}
