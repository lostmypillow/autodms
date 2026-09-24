import { Router } from 'express'
import { dmsScrape } from 'shared/dmsScrape/index.js'
import {
    ExtensionNeededError
} from 'shared/dmsScrape/lib/customErrors.js'
import { broadcast } from '../websocket.js'

const router = Router()

router.get('/:websiteUrl', async (req, res) => {
    const sourceUrl = decodeURIComponent(req.params.websiteUrl)
    try {
        const result = await dmsScrape(sourceUrl)
        return res.json({
            result: result,
        })
    } catch (error) {
        if (error instanceof ExtensionNeededError) {
            broadcast({ event: 'REQUEST', data: sourceUrl })
            return res
                .status(400)
                .json({
                    result: 'Extension needed. Extension has been notified',
                })
        } else {
            return res.status(400).json({ result: 'Not supported' })
        }
    }
})

router.post('/:websiteUrl', async (req, res) => {
    const sourceUrl = decodeURIComponent(req.params.websiteUrl)

    // req.body is already a JS object parsed by app.use(express.json())
    const body = req.body.data

    try {
        const result = await dmsScrape(sourceUrl, body)
        return res.json({
            result: result,
        })
    } catch (error) {
        console.error(error)
        return res.status(400).json({ result: 'Not supported' })
    }
})
export default router
