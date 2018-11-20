import React from "react";
import GammaTable from "../../../../common/views/gamma-table";
import { Fill } from "../../../../common-ui/layout";
import { Add } from "@material-ui/icons";
import { GammaLink } from "../../../../common-ui/design";
import translations from "./ShowAllPosts.screen.translations.json";

import { DigitTranslations, DigitFAB } from "@cthit/react-digit-components";

const ShowAllPosts = ({ posts }) => (
    <DigitTranslations
        translations={translations}
        uniquePath="Posts.Screen.ShowAllPosts"
        render={text => (
            <Fill>
                <GammaTable
                    titleText={text.Posts}
                    searchText={text.SearchForPosts}
                    idProp="id"
                    startOrderBy="sv"
                    columnsOrder={["id", "sv", "en"]}
                    headerTexts={{
                        id: text.Id,
                        sv: text.Swedish,
                        en: text.English,
                        __link: text.Details
                    }}
                    data={posts.map(post => {
                        return {
                            ...post,
                            __link: "/posts/" + post.id
                        };
                    })}
                    emptyTableText={text.NoPosts}
                />
                <GammaLink to="/posts/add">
                    <DigitFAB component={Add} secondary />
                </GammaLink>
            </Fill>
        )}
    />
);

export default ShowAllPosts;
