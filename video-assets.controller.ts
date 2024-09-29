import { Controller, Get, HttpException, HttpStatus, Query, Response } from '@nestjs/common';
import { VideoAssetsService } from './video-assets.service';
import { SitemapStream } from 'sitemap';
import { streamToPromise } from 'stream-to-promise';
import { ConfigService } from '@nestjs/config';

@Controller('video-assets')
export class VideoAssetsController {
    constructor(
        private readonly VideoAssetsService: VideoAssetsService,
        private readonly configService: ConfigService, 
    ) {}

    /**
    * Returns dynamic sitemap
    **/
    @Get('sitemap')
    async sitemap(@Query('company') company: number, @Query('format') format: string, @Response() res) {
        if (!company) {
        throw new HttpException(
            {
            status: HttpStatus.BAD_REQUEST,
            error: 'Company parameter is missing.',
            },
            HttpStatus.BAD_REQUEST,
        );
        }

        res.set('Content-Type', 'text/xml');

        let live_stream_records = await this.VideoAssetsService.getAllActiveVideoAssets("Live Stream", company );
        let ring_stream_records = await this.VideoAssetsService.getAllActiveVideoAssets("Ring Stream Configuration", company );
        let uploaded_videos_records = await this.VideoAssetsService.getAllActiveVideoAssets("Uploaded Videos" ,company );
        const hostname = this.configService.get('HOSTNAME_URL');

        const smStream = new SitemapStream({hostname: hostname});
        live_stream_records.forEach((video) => {
        smStream.write({
            url: `/video/${video.sgl_id}/${video.slug}`,
            lastmod: `${video.modification_date_time}`,
            video: [
                {
                    thumbnail_loc: `${video.placeholder_image}`,
                    title: `${video.title}`,
                    description: `${video.description}`,
                    content_loc: `${video.archive_url}`,
                    family_friendly: "yes",
                    requires_subscription: "no",
                    live: "no",
                },
            ]
        });
        });

        ring_stream_records.forEach((video) => {
        smStream.write({
            url: `/video/${video.sgl_id}/${video.slug}`,
            lastmod: `${video.modification_date_time}`,
            video: [
                {
                    thumbnail_loc: `${video.placeholder_image}`,
                    title: `${video.title}`,
                    description: `${video.description}`,
                    content_loc: `${video.archive_url}`,
                    family_friendly: "yes",
                    requires_subscription: "no",
                    live: "no",
                },
            ]
        });
        });

        uploaded_videos_records.forEach((video) => {
        smStream.write({
            url: `/video/${video.sgl_id}/${video.slug}`,
            lastmod: `${video.modification_date_time}`,
            video: [
                {
                    thumbnail_loc: `${video.placeholder_image}`,
                    title: `${video.title}`,
                    description: `${video.description}`,
                    content_loc: `${video.archive_url}`,
                    family_friendly: "yes",
                    requires_subscription: "no",
                    live: "no",
                },
            ]
        });
        });

        smStream.end();
        streamToPromise(smStream).then((xml) => {
        res.send(xml);
        });
    }

}
