import { Router } from 'express'
import { dmsScrape } from 'shared'

const router = Router()

router.get('/:websiteUrl', async (req, res) => {
    const sourceUrl = decodeURIComponent(req.params.websiteUrl)
    res.json({
        result: await dmsScrape(sourceUrl),
    })
    return
})
export default router
