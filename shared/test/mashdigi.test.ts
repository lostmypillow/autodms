import { describe, expect, it, test } from 'vitest'
import { dmsScrape } from 'shared'
import { NewsArticleTestSchema } from 'shared/interfaces.js'

describe('Test scraping mashdigi articles', () => {
    it('should successfully parse an old article (2024-09-04)', async () => {
        const result = await dmsScrape(
            'https://mashdigi.com/qualcomm-continues-to-launch-the-snapdragon-x-plus-processor-composed-of-8-sets-of-performance-cores-expanding-the-copilot-pc-product-lineup/'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('shoudl successfully scrape a previous bug', async () => {
        const result = await dmsScrape(
            'https://mashdigi.com/ul-benchmark-cooperates-with-mediatek-to-add-a-test-project-called-opacity-micromap-to-the-android-version-of-3dmark/'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article of category headlines', async () => {
        const result = await dmsScrape(
            'https://mashdigi.com/defining-the-way-we-work-in-the-ai-era-microsoft-unveils-the-new-copilot-integrating-a-single-app-and-introducing-a-dual-track-usage-plan-of-subscription-pay-as-you-go/'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })

    it('should successfully parse an article of category AI', async () => {
        const result = await dmsScrape(
            'https://mashdigi.com/is-256gb-really-enough-for-an-iphone-18-pro-from-4k-video-recording-to-offline-ai-models-we-analyze-the-hidden-killers-of-storage-space/'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article of category autonomous driving', async () => {
        const result = await dmsScrape(
            'https://mashdigi.com/waymo-expands-its-driverless-taxi-fleet-again-it-announces-launches-in-three-cities-including-denver-bringing-its-total-number-of-operating-cities-in-the-us-to-14-and-is-also-looking-towards-overse/'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article of category internet', async () => {
        const result = await dmsScrape(
            'https://mashdigi.com/after-a-six-year-hiatus-leaked-apple-code-reveals-the-imminent-arrival-of-the-homepod-mini-2-retaining-its-classic-spherical-shape-but-sporting-a-new-pastel-pink-color/'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article of category processor', async () => {
        const result = await dmsScrape(
            'https://mashdigi.com/free-yourself-from-physical-cables-the-wici-one-pioneers-the-wi-fi-7-wireless-external-graphics-card-allowing-thin-and-light-laptops-to-be-wirelessly-upgraded-to-flagship-gaming-pcs/'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)
    })
    it('should successfully parse an article of category phone', async () => {
        const result = await dmsScrape(
            'https://mashdigi.com/no-more-just-queuing-for-you-the-new-call-for-me-feature-is-launched-on-the-pixel-11-with-gemini-ai-acting-as-your-proxy-for-making-calls/'
        )
        console.log(result)
        expect(result).toMatchObject(NewsArticleTestSchema)

    })







})
