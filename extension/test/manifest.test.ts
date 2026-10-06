import { describe, expect, it } from 'vitest'
import manifest from '../manifest.json' with { type: 'json' }

describe('Extension Manifest Verification', () => {
    it('should have valid manifest version 3 and app metadata', () => {
        expect(manifest.manifest_version).toBe(3)
        expect(manifest.name).toBe('AutoDMS')
        expect(manifest.version).toBe('2.1.3')
        expect(manifest.description).toBe('Extension for automating DMS duties')
    })

    it('should declare necessary permissions', () => {
        expect(manifest.permissions).toContain('contextMenus')
        expect(manifest.permissions).toContain('tabs')
        expect(manifest.permissions).toContain('scripting')
        expect(manifest.permissions).toContain('webNavigation')
        expect(manifest.permissions).toContain('notifications')
    })

    it('should declare host permissions for targeted domains', () => {
        expect(manifest.host_permissions).toContain('https://*.digitimes.com.tw/*')
        expect(manifest.host_permissions).toContain('https://*.ctee.com.tw/*')
        expect(manifest.host_permissions).toContain('https://*.chinatimes.com/*')
        expect(manifest.host_permissions).toContain('https://www.cool3c.com/*')
        expect(manifest.host_permissions).toContain('http://localhost:5173/*')
    })

    it('should have background service worker configured', () => {
        expect(manifest.background).toBeDefined()
        expect(manifest.background.service_worker).toBe('src/background.js')
        expect(manifest.background.type).toBe('module')
    })

    it('should declare content scripts matching local environments', () => {
        expect(manifest.content_scripts).toBeDefined()
        expect(manifest.content_scripts.length).toBeGreaterThan(0)
        const bridgeScript = manifest.content_scripts[0]
        expect(bridgeScript).toBeDefined()
        if (bridgeScript) {
            expect(bridgeScript.js).toContain('src/bridge.js')
            expect(bridgeScript.matches).toEqual([
                'http://localhost:3000/*',
                'http://localhost:5173/*',
            ])
        }

    })
})
