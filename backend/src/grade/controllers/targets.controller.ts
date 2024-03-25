import {Controller, Get, Res} from "@nestjs/common";
import {wrapErrorResponse} from "../../errors/utils/wrap-error-response";
import {UserModel} from "../../authorization/models/user.model";
import {StatusCode} from "../../errors/enums/status-code.enum";
import {TargetItemModel} from "../models/target.model";

@Controller('targets')
export class TargetsController {
    @Get('personal')
    getUserTargets(@Res() response) {
        wrapErrorResponse(async () => {
            const user = await UserModel.findById(response.locals.userId).exec()

            response
                .status(StatusCode.ok)
                .send(
                    await TargetItemModel
                        .findById(user.id) //plokho
                        .projection({ __v: 0 })
                        .exec()
                )
        }, response)
    }
}
