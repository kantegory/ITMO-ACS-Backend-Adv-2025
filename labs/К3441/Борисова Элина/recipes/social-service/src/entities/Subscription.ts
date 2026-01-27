import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "../../../user-service/src/entities/User";

@Entity()
export class Subscription {
    @PrimaryColumn()
    follower_id: string;

    @PrimaryColumn()
    following_id: string;

    @ManyToOne(() => User, (user) => user.followers, { onDelete: "CASCADE" })
    follower: User;

    @ManyToOne(() => User, (user) => user.followings, { onDelete: "CASCADE" })
    following: User;
}